import scrapy

class HLTVNews(scrapy.Spider):
    name = "news"
    count = 0

    def start_requests(self):
        urls =[
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
            
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_search_page)
    
    def parse_search_page(self, response):
        """ url_split = response.url.split("/")
        month = url_split[-1]
        year = url_split[-2]
        filename = 'news-%s-%s.html' % (month, year)
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename) """

        for link in response.css('a.article'):
            next_article = link.css('a::attr(href)').get()
            next_article = response.urljoin(next_article)
            yield scrapy.Request(next_article, callback=self.parse_article)


    def parse_article(self, response):
        self.count += 1
        text = response.css('div.newsdsl .legacy-con p > span::text, div.newsdsl .legacy-con p > span > a::text').getall()
        collapsed_text = ' '.join(''.join(text).split())
        yield {
            'ID': self.count - 1,
            'date': response.css('div.article-info .date::text').get(),
            'title': response.css('h1.headline::text').get(),
            'text': collapsed_text,
            'author': response.css('div.article-info .author a span::text').get(),
        }

