import { configureSync, getConsoleSink } from '@logtape/logtape';
import { getHmiHttpSink } from 'hmi.reusable.web.imp';

configureSync({

  sinks: {

    console: getConsoleSink(),

    remote: getHmiHttpSink('http://localhost:3000/logs'),
  },

  loggers: [

    // Meta logger: LogTape's internal diagnostics.

    // Use a separate sink in production; console is fine in dev.

    {

      category: ['logtape', 'meta'],

      lowestLevel: 'warning', // suppresses the "loggers are configured" banner

      sinks: ['console'],

    },

    // Your application logger tree

    {

      category: [],

      lowestLevel: 'debug',

      sinks: ['console', 'remote'],

    },

  ],

});