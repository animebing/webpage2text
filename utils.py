import re
import urllib.request

from inscriptis import get_text

def do_extract(url: str):
    html = urllib.request.urlopen(url).read().decode('utf-8')
    text = get_text(html)
    print(text)
    text = re.sub('\n+', '\n', text)
    text = re.sub(' +', ' ', text)

    return text
