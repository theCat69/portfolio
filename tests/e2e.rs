use std::env;

use curl::easy::{Easy2, Handler, List, WriteError};

#[derive(Clone)]
struct Collector(Vec<u8>);

impl Handler for Collector {
    fn write(&mut self, data: &[u8]) -> Result<usize, WriteError> {
        self.0.extend_from_slice(data);
        Ok(data.len())
    }
}

struct AppEasy<'a> {
    easy: Easy2<Collector>,
    headers: Vec<&'a str>,
}

impl<'a> AppEasy<'a> {
    pub fn perform(&mut self) -> AppResponse {
        self.easy.http_headers(self.get_headers_from_vec()).unwrap();
        self.easy.perform().unwrap();
        AppResponse {
            code: self.response_code(),
            content: self.get_contents().clone(),
        }
    }

    fn get_headers_from_vec(&self) -> List {
        let mut list = List::new();
        self.headers
            .iter()
            .for_each(|header| list.append(header).unwrap());
        list
    }

    pub fn get_contents(&self) -> &Collector {
        self.easy.get_ref()
    }

    pub fn response_code(&mut self) -> u32 {
        self.easy.response_code().unwrap()
    }

    pub fn append_header(&mut self, header_value: &'a str) {
        self.headers.push(header_value);
    }

    pub fn cookie(&mut self, cookie_value: &str) {
        self.easy.cookie(cookie_value).unwrap();
    }
}

struct AppResponse {
    code: u32,
    content: Collector,
}

fn get_website_url() -> String {
    let port = get_rocket_port();
    format!("http://localhost:{port}")
}

fn get_rocket_port() -> String {
    match env::var_os("ROCKET_PORT") {
        Some(port) => port.to_string_lossy().to_string(),
        None => "8001".to_owned(),
    }
}

fn set_up_easy() -> AppEasy<'static> {
    let mut easy = Easy2::new(Collector(Vec::new()));
    easy.get(true).unwrap();
    easy.url(&get_website_url()).unwrap();
    let mut headers = Vec::new();
    headers.push("Host: localhost");
    headers.push("Cache-Control: max-age=0");
    headers
        .push("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    headers.push("User-Agent: Mozilla/5; Intel Mac OS X 10_10_3 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36");
    headers.push("DNT: 1");
    AppEasy { easy, headers }
}

#[test]
#[ignore]
fn e2e_website_is_up() {
    // given
    let mut app_easy = set_up_easy();
    //when
    let response = app_easy.perform();
    // then
    assert_eq!(response.code, 200);
    let str_content = String::from_utf8_lossy(&response.content.0);
    assert!(str_content.contains("<html lang=\"en-EN\""));
}

#[test]
#[ignore]
fn e2e_website_is_up_en_us() {
    // given
    let mut app_easy = set_up_easy();
    app_easy.append_header("accept-language: en-US;fr-FR,fr;en-EN,p=0.8");
    //when
    let response = app_easy.perform();
    // then
    assert_eq!(response.code, 200);
    let str_content = String::from_utf8_lossy(&response.content.0);
    assert!(str_content.contains("<html lang=\"en-US\""));
}

#[test]
#[ignore]
fn e2e_website_is_up_fr_fr() {
    // given
    let mut app_easy = set_up_easy();
    app_easy.append_header("accept-language: fr-FR;en-US,fr;en-EN,p=0.8");
    //when
    let response = app_easy.perform();
    // then
    assert_eq!(response.code, 200);
    let str_content = String::from_utf8_lossy(&response.content.0);
    assert!(str_content.contains("<html lang=\"fr-FR\""));
}

#[test]
#[ignore]
fn e2e_website_use_cookies_first() {
    // given
    let mut app_easy = set_up_easy();
    app_easy.append_header("accept-language: fr-FR;en-US,fr;en-EN,p=0.8");
    app_easy.cookie("lang=en-US");
    //when
    let response = app_easy.perform();
    // then
    assert_eq!(response.code, 200);
    let str_content = String::from_utf8_lossy(&response.content.0);
    assert!(str_content.contains("<html lang=\"en-US\""));
}

#[test]
#[ignore]
fn e2e_website_use_cookies_first_fr_fr() {
    // given
    let mut app_easy = set_up_easy();
    app_easy.cookie("lang=fr-FR");
    //when
    let response = app_easy.perform();
    // then
    assert_eq!(response.code, 200);
    let str_content = String::from_utf8_lossy(&response.content.0);
    assert!(str_content.contains("<html lang=\"fr-FR\""));
}
