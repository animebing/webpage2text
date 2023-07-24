import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from utils import do_extract

app = FastAPI()
static_dir = './static'
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get('/')
async def get_html():
    with open(os.path.join(static_dir, 'index.html')) as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


@app.get('/api/extract')
async def extract_text(url: str):
    text = do_extract(url)
    return text
    