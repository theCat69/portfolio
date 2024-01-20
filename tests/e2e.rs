use curl::easy::{Easy2, Handler, List, WriteError};

struct Collector(Vec<u8>);

impl Handler for Collector {
    fn write(&mut self, data: &[u8]) -> Result<usize, WriteError> {
        self.0.extend_from_slice(data);
        Ok(data.len())
    }
}

fn get_website_url() -> &'static str {
    "http://localhost:8001"
}

fn set_up_easy() -> Easy2<Collector> {
    let mut easy = Easy2::new(Collector(Vec::new()));
    easy.get(true).unwrap();
    easy.url(get_website_url()).unwrap();
    easy
}

#[test]
#[ignore]
fn e2e_website_is_up() {
    // given
    let mut easy = set_up_easy();
    //when
    easy.perform().unwrap();
    // then
    assert_eq!(easy.response_code().unwrap(), 200);
    let contents = easy.get_ref();
    let str_content = String::from_utf8_lossy(&contents.0);
    assert!(str_content.contains("<html lang=\"en-EN\""));
}

#[test]
#[ignore]
fn e2e_website_is_up_en_us() {
    // given
    let mut easy = set_up_easy();
    let mut headers = List::new();
    headers
        .append("accept-language: en-US;fr-FR,fr;en-EN,p=0.8")
        .unwrap();
    easy.http_headers(headers).unwrap();
    //when
    easy.perform().unwrap();
    // then
    assert_eq!(easy.response_code().unwrap(), 200);
    let contents = easy.get_ref();
    let str_content = String::from_utf8_lossy(&contents.0);
    assert!(str_content.contains("<html lang=\"en-EN\""));
}

#[test]
#[ignore]
fn e2e_website_is_up_fr_fr() {
    // given
    let mut easy = set_up_easy();
    let mut headers = List::new();
    headers
        .append("accept-language: fr-FR;en-US,fr;en-EN,p=0.8")
        .unwrap();
    easy.http_headers(headers).unwrap();
    //when
    easy.perform().unwrap();
    // then
    assert_eq!(easy.response_code().unwrap(), 200);
    let contents = easy.get_ref();
    let str_content = String::from_utf8_lossy(&contents.0);
    assert!(str_content.contains("<html lang=\"fr-FR\""));
}
