export default {
  name: 'date',
  data () {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/Berlin'

    return {
      timeFormat: {
        localeMatcher: 'best fit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        // seconds: '2-digit',
        timeZone: timeZone
        // timeZoneName: 'short'
      },
      dateFormat: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        // weekday: 'long',
        timeZone: timeZone
      },
      dateTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
        timeZone: timeZone,
        timeZoneName: 'short',
      }
    }
  },
  computed: {
    today () {
      return new Date()
    },
  },
  mounted() {
    /**
     * Example Use Cases
     * 1. Get current time in current language
     * this.getCurrentTime()
     *
     * 2. Get current date in current language
     * this.getCurrentDate()
     *
     * 3. Get current date and time in current language
     * this.getCurrentDateTime()
     *
     * 4. Get specific date and time in specific language with custom options
     * this.getCurrentDateTime(new Date('2022-01-01T12:00:00.000Z'), 'en-US', {
     *   month: 'long',
     *   timeZone: 'America/New_York'
     * })
     */
  },
  methods: {
    getCurrentTime(date = this.today, locale, options = {}) {
      const format = {
        ...this.timeFormat,
        ...options
      }
      return date.toLocaleTimeString(locale, format)
    },
    getCurrentDate(date = this.today, locale, options = {}) {
      const format = {
        ...this.dateFormat,
        ...options
      }
      return date.toLocaleDateString(locale, format)
    },
    getCurrentDateTime(date = this.today, locale, options = {}) {
      const format = {
        ...this.dateTimeFormat,
        ...options
      }
      return date.toLocaleString(locale, format)
    }
  }
}
