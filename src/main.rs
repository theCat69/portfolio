#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;

use crate::routes::{index, static_files};
mod routes;

fn rocket() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![static_files::file, index::index])
}

fn main() {
    rocket().launch();
}
