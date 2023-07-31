import re
from urllib.request import Request, urlopen

from inscriptis import get_text

def do_extract(url: str):
    request_site = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urlopen(request_site).read().decode('utf-8')
    text = get_text(html)
    print(text)
    text = re.sub('\n+', '\n', text)
    text = re.sub(' +', ' ', text)

    return text
