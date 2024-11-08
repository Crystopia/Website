import { config } from 'dotenv';

config();

export function httpGetAsync(
  url: string,
  callback: (response: string) => void
) {
  const proxyUrl = process.env.NEXTPORXY_URL;
  const targetUrl = proxyUrl + url;

  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open('GET', targetUrl, true);
  xmlHttp.send(null);
}
