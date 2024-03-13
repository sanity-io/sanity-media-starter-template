# Apple News Preview

Apple News articles can be generated directly through the Sanity Studio.
The 

## Previewing

The only official method of preview Apple News articles is through the News Preview application [which can be downloaded here](https://developer.apple.com/apple-news/resources/).

The News Preview expects a JSON document titled `article.json` and a connected device with Apple News installed.

- In Sanity Studio, navigate to the article you want to preview
- Click the `Apple News` tab in the article header
- Click `Download JSON`
- Open the News Preview application
- Click on the big plus (`+`) icon in the application window, or the file menu bar `File > Open…`
- Selected the downloaded `article.json`
- From the right sidebar in the News Preview app, select a device to preview the article on
- The article should open in Apple News
- If you overwrite the `article.json` file, the Apple News preview will automatically update

## Publishing

Publishing to Apple News requires an Apple Developer account and various publishing channels provisions.

Configuring these are beyond the scope of this starter kit, however the
conversion from Sanity Article Blocks to Apple News JSON can be easily
included in the publishing workflow to automate the process.

## Relevant links

- Apple News developer resources: https://developer.apple.com/apple-news/resources/
- Apple News JSON documentation: https://developer.apple.com/documentation/apple_news/apple_news_format