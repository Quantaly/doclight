use jpeg_to_pdf::JpegToPdf;
use std::error::Error;
use std::io::{prelude::*, BufWriter};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct PdfJob {
    jpegs: Vec<Vec<u8>>,
}

#[wasm_bindgen]
impl PdfJob {
    pub fn new() -> PdfJob {
        PdfJob { jpegs: Vec::new() }
    }

    pub fn add_image(&mut self, image: Vec<u8>) {
        self.jpegs.push(image);
    }

    pub fn create_pdf(self) -> Result<Vec<u8>, JsValue> {
        let mut out = Vec::new();
        let mut buf = BufWriter::new(&mut out);
        JpegToPdf::new()
            .add_images(self.jpegs)
            .strip_exif(true)
            .create_pdf(&mut buf)
            .map_err(jsify_error)?;
        buf.flush().map_err(jsify_error)?;
        drop(buf);
        Ok(out)
    }
}

fn jsify_error(e: impl Error) -> JsValue {
    JsValue::from_str(&format!("{}", e))
}
