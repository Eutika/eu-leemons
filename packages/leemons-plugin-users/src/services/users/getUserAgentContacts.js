const _ = require('lodash');
const { table } = require('../tables');

/**
 *
 * @public
 * @static
 * @param {string|string[]} _fromUserAgent - User agent id/s
 * @param {string|null} fromCenter
 * @param {string|null} fromProfile
 * @param {string|null} toCenter
 * @param {string|null} toProfile
 * @param {string|null} plugin
 * @param {string|null} target
 * @param {any=} transacting - DB Transaction
 * @return {Promise<string[]|Array.<string[]>}
 * */
async function getUserAgentContacts(
  _fromUserAgent,
  {
    fromCenter = null,
    fromProfile = null,
    toCenter = null,
    toProfile = null,
    plugin = null,
    target = null,
    transacting,
  } = {}
) {
  const isArray = _.isArray(_fromUserAgent);
  const fromUserAgents = isArray ? _fromUserAgent : [_fromUserAgent];
  const query = {
    fromUserAgent_$in: fromUserAgents,
  };

  if (fromCenter) query.fromCenter = fromCenter;
  if (fromProfile) query.fromProfile = fromProfile;
  if (toCenter) query.toCenter = toCenter;
  if (toProfile) query.toProfile = toProfile;
  if (plugin) query.plugin = plugin;
  if (target) query.target = target;

  const response = await table.userAgentContacts.find(query, { transacting });

  if (isArray) {
    const responseByFromUserAgent = _.groupBy(response, 'fromUserAgent');
    return _.map(fromUserAgents, (fromUserAgent) => {
      return _.map(responseByFromUserAgent[fromUserAgent], 'toUserAgent');
    });
  } else {
    return _.map(response, 'toUserAgent');
  }
}

module.exports = { getUserAgentContacts };
