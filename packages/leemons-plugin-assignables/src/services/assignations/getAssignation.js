const dayjs = require('dayjs');
const { getDates } = require('../dates');
const { assignations } = require('../tables');
const getGrade = require('../grades/getGrade');
const getUserPermission = require('../assignableInstance/permissions/assignableInstance/users/getUserPermission');

module.exports = async function getAssignation(
  assignableInstanceId,
  user,
  { userSession, transacting } = {}
) {
  // EN: Check permissions (or teacher or student)
  // ES: Comprueba permisos (o profesor o estudiante)
  if (
    !(
      userSession.userAgents.map((u) => u.id).includes(user) ||
      (
        await getUserPermission(assignableInstanceId, { userSession, transacting })
      ).actions.includes('edit')
    )
  ) {
    throw new Error('Assignation not found or your are not allowed to view it');
  }

  let assignation = await assignations.findOne(
    {
      instance: assignableInstanceId,
      user,
    },
    { transacting }
  );

  if (!assignation) {
    throw new Error('Assignation not found or your are not allowed to view it');
  }

  const instanceDates = await getDates('assignableInstance', assignableInstanceId, {
    transacting,
  });

  assignation = {
    ...assignation,
    classes: JSON.parse(assignation.classes),
    metadata: JSON.parse(assignation.metadata),
  };

  assignation.timestamps = await getDates('assignation', assignation.id, { transacting });
  assignation.grades = await getGrade({ assignation: assignation.id }, { transacting });

  if (
    assignation.timestamps.end ||
    (assignation.timestamps.deadline && dayjs(assignation.timestamps.deadline).isBefore(dayjs())) ||
    (instanceDates.close && dayjs(instanceDates.close).isBefore(dayjs())) ||
    (instanceDates.closed && dayjs(instanceDates.closed).isBefore(dayjs()))
  ) {
    assignation.finished = true;
  } else {
    assignation.finished = false;
  }
  return assignation;
};
