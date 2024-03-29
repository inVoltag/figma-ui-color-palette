export default class Dispatcher {
  time: number
  on: {
    active: boolean
    blocked: boolean
    interval: number | string
    send: () => void
    stop: () => void
    status: boolean
  }

  constructor(callback: () => void, time: number) {
    this.time = time
    this.on = {
      active: false,
      blocked: false,
      interval: 0,
      send() {
        this.interval = setInterval(callback, time)
        this.blocked = true
      },
      stop() {
        callback()
        clearInterval(this.interval)
        this.blocked = false
      },
      get status() {
        return this.active
      },
      set status(bool) {
        if (!this.blocked && bool) this.send()
        else if (this.blocked && !bool) this.stop()
        this.active = bool
      },
    }
  }
}
