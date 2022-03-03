const createInstance = require('../src/services/assignment/instance/create');
const removeInstance = require('../src/services/assignment/instance/remove');
const { get: getInstance } = require('../src/services/assignment/instance/get');

const assignStudent = require('../src/services/assignment/student/assign');
const unassignStudent = require('../src/services/assignment/student/remove');
const listStudents = require('../src/services/assignment/student/list');
const listAssignedStudents = require('../src/services/assignment/teacher/listAssigned');

const assignTeacher = require('../src/services/assignment/teacher/assign');
const unassignTeacher = require('../src/services/assignment/teacher/remove');
const listTeachers = require('../src/services/assignment/teacher/listTeachers');

module.exports = {
  /**
   * Instances
   */
  instanceCreate: async (ctx) => {
    try {
      const { task } = ctx.request.params;
      const { startDate, deadline, visualizationDate, executionTime, message } = ctx.request.body;

      const instance = await createInstance({
        task,
        startDate,
        deadline,
        visualizationDate,
        executionTime,
        message,
      });

      ctx.status = 201;
      ctx.body = {
        status: 201,
        instance,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  instanceGet: async (ctx) => {
    try {
      const { instance } = ctx.request.params;
      let { columns } = ctx.query;

      try {
        columns = JSON.parse(columns);
      } catch (e) {
        if (columns !== '*') {
          columns = undefined;
        }
      }

      const data = await getInstance(instance, {
        columns,
      });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        data,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  instanceDelete: async (ctx) => {
    try {
      const { task, instance } = ctx.request.params;

      const deleted = await removeInstance(task, instance);

      ctx.status = 200;
      ctx.body = {
        status: 200,
        ...deleted,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },

  /**
   * Students
   */
  studentAssign: async (ctx) => {
    try {
      const { instance } = ctx.request.params;
      const { student } = ctx.request.body;

      const assigned = await assignStudent(instance, student);

      ctx.status = 201;
      ctx.body = {
        status: 201,
        ...assigned,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  studentUnassign: async (ctx) => {
    try {
      const { instance, student } = ctx.request.params;

      const unassigned = await unassignStudent(instance, student);

      ctx.status = 200;
      ctx.body = {
        status: 200,
        ...unassigned,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  studentListAssigned: async (ctx) => {
    try {
      const { user } = ctx.request.params;
      const { page, size } = ctx.request.query;

      const tasks = await listAssignedStudents(user, page, size);

      ctx.status = 200;
      ctx.body = {
        status: 200,
        tasks,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  studentList: async (ctx) => {
    try {
      const { instance } = ctx.request.params;
      const { page, size } = ctx.request.query;

      const students = await listStudents(
        instance,
        parseInt(page, 10) || undefined,
        parseInt(size, 10) || undefined
      );

      ctx.status = 200;
      ctx.body = {
        status: 200,
        students,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },

  /**
   * Teachers
   */
  teacherAssign: async (ctx) => {
    try {
      const { instance } = ctx.request.params;
      const { teacher } = ctx.request.body;

      const assigned = await assignTeacher(instance, teacher);

      ctx.status = 201;
      ctx.body = {
        status: 201,
        ...assigned,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  teacherUnassign: async (ctx) => {
    try {
      const { instance, teacher } = ctx.request.params;

      const unassigned = await unassignTeacher(instance, teacher);

      ctx.status = 200;
      ctx.body = {
        status: 200,
        ...unassigned,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  teacherListAssigned: async (ctx) => {
    try {
      const { user } = ctx.request.params;
      const { page, size, details } = ctx.request.query;
      let { columns } = ctx.request.query;

      try {
        columns = JSON.parse(columns);
      } catch (e) {
        if (columns !== '*') {
          columns = undefined;
        }
      }

      const tasks = await listAssigned(user, parseInt(page, 10) || 0, parseInt(size, 10) || 10, {
        details: details === 'true',
        columns,
      });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        tasks,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  teacherList: async (ctx) => {
    try {
      const { instance } = ctx.request.params;
      const { page, size } = ctx.request.query;

      const students = await listTeachers(instance, parseInt(page, 10), parseInt(size, 10));

      ctx.status = 200;
      ctx.body = {
        status: 200,
        students,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
};
