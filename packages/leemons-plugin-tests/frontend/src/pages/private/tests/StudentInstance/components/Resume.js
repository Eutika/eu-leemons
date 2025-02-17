import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Box, HtmlText, TabPanel, Tabs, Title } from '@bubbles-ui/components';
import { CurriculumListContents } from '@curriculum/components/CurriculumListContents';
import { useClassesSubjects } from '@academic-portfolio/hooks';
import { isEmpty } from 'lodash';
import { ButtonNavigation } from './ButtonNavigation';

export default function Resume(props) {
  const { classes, cx, t, store, styles } = props;

  let canStart = true;

  if (store.instance.dates?.start) {
    const now = new Date();
    const start = new Date(store.instance.dates.start);
    if (now < start) {
      canStart = false;
    }
  }

  const subjects = useClassesSubjects(store.instance.classes);

  const tabPanelStyle = (theme) => ({ marginLeft: theme.spacing[3] });

  let curriculum = null;

  if (store.instance.assignable.subjects[0].curriculum.curriculum?.length) {
    const curriculumKeysToShow = Object.entries(store.instance.curriculum)
      .filter(([, value]) => value)
      .map(([key]) => key);
    curriculum = store.instance.assignable.subjects[0].curriculum.curriculum;
    curriculum = curriculum.filter((key) => {
      const regex = new RegExp(curriculumKeysToShow.join('|'), 'i');
      return regex.test(key);
    });
  }

  return (
    <Box className={cx(classes.loremIpsum, classes.limitedWidthStep)}>
      {store.instance?.assignable?.statement ? (
        <>
          <Title order={2}>{t('resume')}</Title>
          <Box sx={(theme) => ({ marginTop: theme.spacing[4], marginBottom: theme.spacing[4] })}>
            <HtmlText>{store.instance.assignable.statement}</HtmlText>
          </Box>
        </>
      ) : null}

      {!isEmpty(store.instance?.assignable?.subjects?.[0].curriculum) ? (
        <Tabs>
          <TabPanel label={subjects?.[0]?.name}>
            <Box sx={(theme) => ({ marginTop: theme.spacing[4] })} />
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[4],
              })}
            >
              {curriculum ? (
                <Box sx={tabPanelStyle}>
                  <Box>
                    <CurriculumListContents value={curriculum} />
                  </Box>
                </Box>
              ) : null}
              {!!store.instance.assignable.subjects[0].curriculum.objectives &&
              !!store.instance.assignable.subjects[0].curriculum.objectives?.length ? (
                <Box sx={tabPanelStyle}>
                  <Box>
                    <Title color="primary" order={5}>
                      {t('objectives')}
                    </Title>
                    {/* TODO: Use react lists */}
                    <HtmlText>
                      {`
                      <ul>
                      ${store.instance.assignable.subjects[0].curriculum.objectives
                        ?.map(
                          ({ objective }) =>
                            `<li>
                            ${objective}
                          </li>`
                        )
                        ?.join('')}
                      </ul>
                    `}
                    </HtmlText>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </TabPanel>
        </Tabs>
      ) : null}

      {canStart ? (
        <ButtonNavigation {...props} />
      ) : (
        <Box className={styles.timeLimitContainer} style={{ margin: 0 }}>
          <Title order={5}>{t('importantInformation')}</Title>
          <Box className={styles.timeLimitContent}>
            <Box
              className={styles.timeLimitInfo}
              sx={(theme) => ({
                paddingLeft: theme.spacing[6],
                gap: theme.spacing[4],
                // textAlign: 'left',
                textAlign: 'center',
                flexDirection: 'column',
              })}
            >
              <Box>{t('informationOnlyView')}</Box>
              <Box>
                {t('informationStart', {
                  date: `${dayjs(store.instance.dates.start).format('L - HH:mm ')}h`,
                })}
              </Box>
            </Box>
            {/* <img className={styles.timeLimitImage} src="/public/tests/ninaBrazoLevantado.png" /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
}

Resume.propTypes = {
  classes: PropTypes.any,
  t: PropTypes.any,
  cx: PropTypes.any,
  store: PropTypes.any,
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  isFirstStep: PropTypes.bool,
  styles: PropTypes.any,
};
