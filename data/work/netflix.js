export default {
  meta: {
    index: 1,
    title: 'Netflix',
    tagline: 'GODLESS Media & Influencer Event',
    tags: ['experiential', 'consumer', 'event'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    poster: 'work/netflix/godless_poster.jpg'
  },
  content: [
    {
      dots: false,
      gallery: [
        'work/netflix/godless_p1.jpg',
        'work/netflix/godless_p2.jpg',
        'work/netflix/godless_p3.jpg',
        'work/netflix/godless_p4.jpg'
      ]
    },
    {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    { image: 'work/netflix/godless_2.jpg' },
    { image: 'work/netflix/godless_3.jpg' },
    {
      markdown: `
      #### headline
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      
      * labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris [nisi](http://www.toddstreet.com) ut aliquip ex ea commodo consequat.

      this is not also a bullet
      `
    }
  ]
}
