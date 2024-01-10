#!/usr/bin/env bun

import {fakeArticles} from './adapters/mock'
import {scrape, write} from './html/scrape'

const args = process.argv.slice(2)

const main = (args: string[]) => {
  if (args.length === 0) {
    console.log('No arguments provided.')
    return
  }

  const command = args[0]
  if (command === 'import') {
    console.log('🕵️ Scraping content')
    scrape()
  }

  if (command === 'write') {
    console.log('📤 Exporting content')
    write()
  }

  if (command === 'fake') {
    const count = parseInt(process.argv[3], 10) || 100
    fakeArticles(count)
  }
}

main(args)
