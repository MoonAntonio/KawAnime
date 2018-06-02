export default {
  data: () => ({
    rawTime: 0,
    cues: [],
    activeCues: [],
    index: 0
  }),

  computed: {
    nbCues () {
      return this.cues.length
    }
  },

  methods: {
    addCue (cue) {
      this.cues.push(cue)

      this.cues = this.$_.sortBy(this.cues, ['start'])
    },
    isActive (cue) {
      const { start, end } = cue
      const { rawTime } = this

      return end >= rawTime && start <= rawTime
    },
    updateActiveCues () {
      this.clearActiveCues()
      this.setActiveCues()
    },
    setActiveCues () {
      const { index, nbCues } = this
      let hasAdded = false

      for (let i = index > 0 ? index - 1 : index, l = nbCues; i < l; ++i) {
        const _cue = this.cues[i]

        if (this.isActive(_cue)) {
          let isAlreadyIn = this.$_.find(this.activeCues, { id: _cue.id })

          if (!isAlreadyIn) {
            this.activeCues.push(_cue)

            if (!hasAdded) hasAdded = true
          }
        } else {
          if (hasAdded) {
            // We check overlap once it's over
            this.checkOverlap()
            this.index = i
            break
          }
        }
      }
    },
    clearActiveCues () {
      this.activeCues = this.activeCues.filter((_cue) => {
        return this.isActive(_cue)
      })
    }
  }
}