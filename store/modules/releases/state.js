import {fansubs} from 'store/modules/lists.js'
import {moment} from 'store/utils.js'

export default {
  releases: [],
  autoRefresh: true,
  updateTime: moment(),
  notLoaded: false,
  params: {
    quality: '',
    fansub: '',
    choice: 'si'
  },
  fansubs
}
