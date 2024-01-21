#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;

use rocket_async_compression::{CachedCompression, Compression};

use crate::routes::{index, static_files};
mod routes;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![static_files::file, index::index])
        .attach(CachedCompression::path_suffix_fairing(vec![
            ".html".to_string(),
            ".js".to_string(),
            ".css".to_string(),
        ]))
        .attach(Compression::fairing())
}
