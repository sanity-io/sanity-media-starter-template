#!/usr/bin/env bun

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
    console.log('Exporting content')
    write()
  }
}

main(args)
