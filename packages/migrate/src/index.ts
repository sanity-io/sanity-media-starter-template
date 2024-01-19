#!/usr/bin/env bun

import {fakeArticles} from './adapters/mock'
import {scrape, write} from './html/scrape'

const args = process.argv.slice(2)

const main = (args: string[]) => {
  if (args.length === 0) {
    console.log('No command provided. Options are:')
    console.log('import - Scrape content from a website')
    console.log('export - Write scraped content to disk')
    console.log('fake - Generate fake articles')
    return
  }

  const command = args[0]
  if (command === 'import') {
    console.log('🕵️ Scraping content')
    scrape()
  }

  if (command === 'export') {
    console.log('📤 Exporting content')
    write()
  }

  if (command === 'fake') {
    const count = parseInt(process.argv[3], 10) || 100
    fakeArticles(count)
  }
}

main(args)
