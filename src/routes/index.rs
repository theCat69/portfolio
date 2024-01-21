use itertools::Itertools;
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
        let cookies = request.cookies();
        let lang_cookie = cookies.get("lang");
        match lang_cookie {
            Some(lang_cook) => match SupportedLangages::from_iso_code(lang_cook.value()) {
                Some(lang) => Outcome::Success(lang),
                None => request_from_header(request),
            },
            None => request_from_header(request),
        }
    }
}

fn request_from_header(
    request: &Request<'_>,
) -> Outcome<SupportedLangages, (rocket::http::Status, Infallible), ()> {
    let accept_language = request.headers().get_one("accept-language");
    match accept_language {
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
    use crate::routes::index::SupportedLangages;

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
}
