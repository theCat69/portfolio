use rocket::fs::NamedFile;
use std::path::{Path, PathBuf};

#[get("/<file..>")]
pub async fn file(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("./dist").join(file)).await.ok()
}
