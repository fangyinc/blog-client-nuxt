/**
 * Created by Staneyffer on 18-7-24.
 */

import Vue from 'vue'
import VueLogger from 'vuejs-logger'

const loggerConfig = {
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: false,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: true
}
Vue.use(VueLogger, loggerConfig)
