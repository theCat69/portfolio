use itertools::Itertools;
use rocket::request;
use rocket::{response::NamedFile, Outcome, Request};
use std::{convert::Infallible, io};

#[derive(Debug, Default)]
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

    pub fn from_accepted_language_header_value(accept_lang: &str) -> Self {
        let intermediate = accept_lang.split(";").join(",");
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
        let accept_language = request.headers().get_one("accept-language");
        match accept_language {
            Some(accept_lang) => Outcome::Success(
                SupportedLangages::from_accepted_language_header_value(accept_lang),
            ),
            // token does not exist
            None => Outcome::Success(SupportedLangages::default()),
        }
    }
}

#[get("/")]
pub fn index(used_lang: SupportedLangages) -> io::Result<NamedFile> {
    NamedFile::open(used_lang.as_file_path())
}
