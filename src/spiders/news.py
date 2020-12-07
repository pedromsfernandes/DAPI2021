import scrapy
import re

class HLTVNews(scrapy.Spider):
    name = "news"
    count = 0

    custom_settings = {
        "DOWNLOAD_DELAY": 3
    }

    def start_requests(self):
        urls = [
            'https://www.hltv.org/news/archive/2018/january',
            'https://www.hltv.org/news/archive/2018/february',
            'https://www.hltv.org/news/archive/2018/march',
            'https://www.hltv.org/news/archive/2018/april',
            'https://www.hltv.org/news/archive/2018/may',
            'https://www.hltv.org/news/archive/2018/june',
            'https://www.hltv.org/news/archive/2018/july',
            'https://www.hltv.org/news/archive/2018/august',
            'https://www.hltv.org/news/archive/2018/september',
            'https://www.hltv.org/news/archive/2018/october',
            'https://www.hltv.org/news/archive/2018/november',
            'https://www.hltv.org/news/archive/2018/december',
            'https://www.hltv.org/news/archive/2019/january',
            'https://www.hltv.org/news/archive/2019/february',
            'https://www.hltv.org/news/archive/2019/march',
            'https://www.hltv.org/news/archive/2019/april',
            'https://www.hltv.org/news/archive/2019/may',
            'https://www.hltv.org/news/archive/2019/june',
            'https://www.hltv.org/news/archive/2019/july',
            'https://www.hltv.org/news/archive/2019/august',
            'https://www.hltv.org/news/archive/2019/september',
            'https://www.hltv.org/news/archive/2019/october',
            'https://www.hltv.org/news/archive/2019/november',
            'https://www.hltv.org/news/archive/2019/december',
            'https://www.hltv.org/news/archive/2015/march',
            'https://www.hltv.org/news/archive/2015/april',
            'https://www.hltv.org/news/archive/2015/may',
            'https://www.hltv.org/news/archive/2015/june',
            'https://www.hltv.org/news/archive/2015/july',
            'https://www.hltv.org/news/archive/2015/august',
            'https://www.hltv.org/news/archive/2015/september',
            'https://www.hltv.org/news/archive/2015/october',
            'https://www.hltv.org/news/archive/2015/november',
            'https://www.hltv.org/news/archive/2015/december',
            'https://www.hltv.org/news/archive/2016/january',
            'https://www.hltv.org/news/archive/2016/february',
            'https://www.hltv.org/news/archive/2016/march',
            'https://www.hltv.org/news/archive/2016/april',
            'https://www.hltv.org/news/archive/2016/may',
            'https://www.hltv.org/news/archive/2016/june',
            'https://www.hltv.org/news/archive/2016/july',
            'https://www.hltv.org/news/archive/2016/august',
            'https://www.hltv.org/news/archive/2016/september',
            'https://www.hltv.org/news/archive/2016/october',
            'https://www.hltv.org/news/archive/2016/november',
            'https://www.hltv.org/news/archive/2016/december',
            'https://www.hltv.org/news/archive/2017/january',
            'https://www.hltv.org/news/archive/2017/february',
            'https://www.hltv.org/news/archive/2017/march',
            'https://www.hltv.org/news/archive/2017/april',
            'https://www.hltv.org/news/archive/2017/may',
            'https://www.hltv.org/news/archive/2017/june',
            'https://www.hltv.org/news/archive/2017/july',
            'https://www.hltv.org/news/archive/2017/august',
            'https://www.hltv.org/news/archive/2017/september',
            'https://www.hltv.org/news/archive/2017/october',
            'https://www.hltv.org/news/archive/2017/november',
            'https://www.hltv.org/news/archive/2017/december',
            'https://www.hltv.org/news/archive/2020/january',
            'https://www.hltv.org/news/archive/2020/february',
            'https://www.hltv.org/news/archive/2020/march',

        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_search_page)

    def parse_search_page(self, response):
        for link in response.css('a.article'):
            next_article = link.css('a::attr(href)').get()
            next_article = response.urljoin(next_article)
            yield scrapy.Request(next_article, callback=self.parse_article)

    def parse_article(self, response):
        self.count += 1
        text = response.css(
            'div.newsdsl .legacy-con p > span::text, div.newsdsl .legacy-con p > span > a::text, div.newsdsl .newstext-con p::text, div.newsdsl .newstext-con p > a::text').getall()
        match_link = response.css('.newsitem-match-result-score-con > a')
        match_id = ""
        if not match_link == []:
            p = re.compile('\/matches\/(\d*)\/')
            m = p.match(match_link.attrib["href"])
            match_id = m.groups()[0]
    
        collapsed_text = ' '.join(''.join(text).split())
        
        yield {
            'ID': self.count - 1,
            'date': response.css('div.article-info .date::text').get(),
            'title': response.css('h1.headline::text').get(),
            'text': collapsed_text,
            'author': response.css('div.article-info .author a span::text').get(),
            'match_id': match_id
        }
