#![feature(proc_macro_hygiene, decl_macro)]

extern crate rocket;
extern crate rocket_cors;

use rocket::ignite;
use rocket_contrib::serve::StaticFiles;

fn main() {
    ignite().mount("/", StaticFiles::from("../public")).launch();
}
