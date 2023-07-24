from trafilatura import fetch_url, extract

def do_extract(url: str):
    downloaded = fetch_url(url)
    text = extract(downloaded)

    return text
