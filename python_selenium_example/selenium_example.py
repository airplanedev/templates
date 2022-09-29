from selenium import webdriver
from selenium.webdriver import FirefoxOptions


def main():
    opts = FirefoxOptions()
    opts.add_argument("--headless")
    with webdriver.Firefox(options=opts) as driver:
        driver.get("https://airplane.dev")
        return {"page_source_len": len(driver.page_source)}
