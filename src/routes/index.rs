use itertools::Itertools;
use rocket::{fs::NamedFile, http::Status, outcome::Outcome, request, Request};
use std::convert::Infallible;

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

#[rocket::async_trait]
impl<'a> request::FromRequest<'a> for SupportedLangages {
    type Error = Infallible;

    async fn from_request(request: &'a Request<'_>) -> request::Outcome<Self, Self::Error> {
        let lang_cookie_value = extract_cookie_value(request);
        let accept_language = request.headers().get_one("accept-language");
        from_lang_cookie_value_or_accept_lang_value(lang_cookie_value, accept_language)
    }
}

fn from_lang_cookie_value_or_accept_lang_value(
    lang_cookie_value: Option<String>,
    accept_language: Option<&str>,
) -> Outcome<SupportedLangages, (Status, Infallible), Status> {
    match lang_cookie_value {
        Some(lang_cook) => match SupportedLangages::from_iso_code(&lang_cook) {
            Some(lang) => Outcome::Success(lang),
            None => request_from_header_lang_value_or_default(accept_language),
        },
        None => request_from_header_lang_value_or_default(accept_language),
    }
}

fn extract_cookie_value(request: &Request<'_>) -> Option<String> {
    let cookies = request.cookies();
    let lang_cookie = cookies.get("lang");
    match lang_cookie {
        Some(lang_cook) => Some(lang_cook.value().to_string()),
        None => None,
    }
}

fn request_from_header_lang_value_or_default(
    accept_language: Option<&str>,
) -> Outcome<SupportedLangages, (rocket::http::Status, Infallible), Status> {
    match accept_language {
        Some(accept_lang) => Outcome::Success(
            SupportedLangages::from_accepted_language_header_value(accept_lang),
        ),
        None => Outcome::Success(SupportedLangages::default()),
    }
}

#[get("/")]
pub async fn index(used_lang: SupportedLangages) -> Option<NamedFile> {
    NamedFile::open(used_lang.as_file_path()).await.ok()
}

#[cfg(test)]
mod tests {
    use crate::routes::index::{from_lang_cookie_value_or_accept_lang_value, SupportedLangages};

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
    fn from_lang_cookie_value_or_accept_lang_value_test() {
        // given
        let accept_lang = Some("en-US,fr;q=0.8,it-IT;q=0.5");
        let cookie = Some("fr-FR".to_string());
        //when
        let result = from_lang_cookie_value_or_accept_lang_value(cookie, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::FrFr);
    }

    #[test]
    fn from_lang_cookie_value_or_accept_lang_value_test_en_us() {
        // given
        let accept_lang = Some("fr-FR,fr;q=0.8,it-IT;q=0.5");
        let cookie = Some("en-US".to_string());
        //when
        let result = from_lang_cookie_value_or_accept_lang_value(cookie, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::EnUs);
    }

    #[test]
    fn from_lang_cookie_value_or_accept_lang_value_no_cookie() {
        // given
        let accept_lang = Some("fr-FR,fr;q=0.8,it-IT;q=0.5");
        let cookie = None;
        //when
        let result = from_lang_cookie_value_or_accept_lang_value(cookie, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::FrFr);
    }

    #[test]
    fn from_lang_cookie_value_or_accept_lang_value_not_corres_default() {
        // given
        let accept_lang = Some("de-DE,de;q=0.8,it-IT;q=0.5");
        let cookie = Some("de-DE".to_string());
        //when
        let result = from_lang_cookie_value_or_accept_lang_value(cookie, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::EnEn);
    }

    #[test]
    fn from_lang_cookie_value_or_accept_lang_value_not_value_default() {
        // given
        let accept_lang = None;
        let cookie = None;
        //when
        let result = from_lang_cookie_value_or_accept_lang_value(cookie, accept_lang);
        //then
        assert_eq!(result.unwrap(), SupportedLangages::EnEn);
    }
}
