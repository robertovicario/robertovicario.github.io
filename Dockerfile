FROM ruby:3.2

RUN apt-get update -qq && apt-get install -y nodejs yarn

WORKDIR /srv/jekyll

COPY Gemfile* ./

RUN gem install bundler
RUN bundle install

COPY . .

EXPOSE 9100

CMD ["bundle", "exec", "jekyll", "serve", "--no-cache", "--livereload", "--host", "0.0.0.0"]
