use itertools::Itertools;
use rocket::http::Cookies;
use rocket::request;
use rocket::{response::NamedFile, Outcome, Request};
use std::{convert::Infallible, io};

#[derive(Debug, Default, PartialEq)]
pub enum SupportedLangages {
    EnUs,
    FrFr,
    #[default]
    EnEn,
}

impl SupportedLangages {
    pub fn as_file_path(&self) -> String {
        let iso_code = self.as_iso_code();
        format!("dist/{iso_code}/index.html")
    }

    pub fn as_iso_code(&self) -> &str {
        match self {
            SupportedLangages::EnUs => "en-US",
            SupportedLangages::FrFr => "fr-FR",
            SupportedLangages::EnEn => "en-EN",
        }
    }

    pub fn from_iso_code(iso_code: &str) -> Option<Self> {
        match iso_code {
            "en-US" => Some(SupportedLangages::EnUs),
            "fr-FR" => Some(SupportedLangages::FrFr),
            "en-EN" => Some(SupportedLangages::EnEn),
            _ => None,
        }
    }

    pub fn from_lang(iso_code: &str) -> Option<Self> {
        match iso_code {
            "en" => Some(SupportedLangages::EnEn),
            "fr" => Some(SupportedLangages::FrFr),
            _ => None,
        }
    }

    pub fn from_accepted_language_header_value(accept_langs: &str) -> Self {
        let intermediate = accept_langs.split(";").join(",");
        let langs_vec = intermediate.split(",").collect_vec();
        match langs_vec
            .iter()
            .find(|lang| SupportedLangages::from_iso_code(lang).is_some())
        {
            Some(lang) => SupportedLangages::from_iso_code(lang).unwrap(),
            None => match langs_vec
                .iter()
                .find(|lang| SupportedLangages::from_lang(lang).is_some())
            {
                Some(lang) => SupportedLangages::from_lang(lang).unwrap(),
                None => SupportedLangages::default(),
            },
        }
    }
}

impl<'a, 'r> request::FromRequest<'a, 'r> for SupportedLangages {
    type Error = Infallible;

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        let lang_cookie_value = extract_cookie_value(request.cookies());
        let accept_lang = request.headers().get_one("accept-langage");
        if let Some(cookievalue) = lang_cookie_value.clone() {
            println!("cookie value : {}", cookievalue);
        }
        if let Some(acceptlang) = accept_lang {
            println!("accept lang : {}", acceptlang);
        }
        request_from_cookie_or_accept_lang_header(lang_cookie_value, accept_lang)
    }
}

fn extract_cookie_value(cookies: Cookies) -> Option<String> {
    let lang_cookie = cookies.get("lang");
    let lang_cookie_value = match lang_cookie {
        Some(cookie) => Some(cookie.value().to_owned()),
        None => None,
    };
    lang_cookie_value
}

fn request_from_cookie_or_accept_lang_header(
    lang_cookie_value: Option<String>,
    accept_lang: Option<&str>,
) -> Outcome<SupportedLangages, (rocket::http::Status, Infallible), ()> {
    match lang_cookie_value {
        Some(lang_cook) => match SupportedLangages::from_iso_code(lang_cook.as_str()) {
            Some(lang) => Outcome::Success(lang),
            None => request_from_header_or_default(accept_lang),
        },
        None => request_from_header_or_default(accept_lang),
    }
}

fn request_from_header_or_default(
    accept_lang_header: Option<&str>,
) -> Outcome<SupportedLangages, (rocket::http::Status, Infallible), ()> {
    match accept_lang_header {
        Some(accept_lang) => Outcome::Success(
            SupportedLangages::from_accepted_language_header_value(accept_lang),
        ),
        None => Outcome::Success(SupportedLangages::default()),
    }
}

#[get("/")]
pub fn index(used_lang: SupportedLangages) -> io::Result<NamedFile> {
    NamedFile::open(used_lang.as_file_path())
}

#[cfg(test)]
mod tests {
    use crate::routes::index::{request_from_cookie_or_accept_lang_header, SupportedLangages};

    #[test]
    fn from_accepted_langage_header_en_us_test() {
        // given
        let accept_lang = "en-US,en;q=0.8,fr-FR;q=0.5";
        //when
        let result = SupportedLangages::from_accepted_language_header_value(accept_lang);
        //then
        assert_eq!(result, SupportedLangages::EnUs);
    }

    #[test]
    fn from_accepted_langage_header_fr_fr_test() {
        // given
        let accept_lang = "fr-FR,en;q=0.8,en-EN;q=0.5";
        //when
        let result = SupportedLangages::from_accepted_language_header_value(accept_lang);
        //then
        assert_eq!(result, SupportedLangages::FrFr);
    }

    #[test]
    fn from_accepted_langage_header_default_test() {
        // given
        let accept_lang = "de-DE,de;q=0.8,it-IT;q=0.5";
        //when
        let result = SupportedLangages::from_accepted_language_header_value(accept_lang);
        //then
        assert_eq!(result, SupportedLangages::EnEn);
    }

    #[test]
    fn from_accepted_langage_header_from_lang_test() {
        // given
        let accept_lang = "de-DE,fr;q=0.8,it-IT;q=0.5";
        //when
        let result = SupportedLangages::from_accepted_language_header_value(accept_lang);
        //then
        assert_eq!(result, SupportedLangages::FrFr);
    }

    #[test]
    fn request_from_cookie_or_accept_lang_header_test_no_cookie() {
        // given
        let accept_lang = Some("fr-FR,en;q=0.8,en-US;q=0.5");
        //when
        let result = request_from_cookie_or_accept_lang_header(None, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::FrFr);
    }

    #[test]
    fn request_from_cookie_or_accept_lang_header_test_no_cookie_en_us() {
        // given
        let accept_lang = Some("en-US,en;q=0.8,fr-FR;q=0.5");
        //when
        let result = request_from_cookie_or_accept_lang_header(None, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::EnUs);
    }

    #[test]
    fn request_from_cookie_or_accept_lang_header_test() {
        // given
        let accept_lang = Some("en-US,en;q=0.8,fr-FR;q=0.5");
        let lang_cookie_value = Some("fr-FR".to_owned());
        //when
        let result = request_from_cookie_or_accept_lang_header(lang_cookie_value, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::FrFr);
    }

    #[test]
    fn request_from_cookie_or_accept_lang_header_test_en_us() {
        // given
        let accept_lang = Some("fr-FR,en;q=0.8,fr-FR;q=0.5");
        let lang_cookie_value = Some("en-US".to_owned());
        //when
        let result = request_from_cookie_or_accept_lang_header(lang_cookie_value, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::EnUs);
    }
}
