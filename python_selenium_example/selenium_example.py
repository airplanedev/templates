from typing import Dict, Any

from selenium import webdriver
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.common.by import By


def main(params: Dict[str, Any]) -> Dict[str, Any]:
    opts = FirefoxOptions()
    opts.add_argument("--headless")
    with webdriver.Firefox(options=opts) as driver:
        driver.get(params["url"])
        links = set()
        for elem in driver.find_elements(By.TAG_NAME, 'a'):
            href = elem.get_attribute("href")
            if href:
                links.add(href)
        return {"links": sorted(links), "count": len(links)}
