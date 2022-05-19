import { createStyles, getFontProductive } from '@bubbles-ui/components';

export const TestStyles = createStyles((theme, {}) => ({
  timeLimitContainer: {
    paddingTop: theme.spacing[6],
    width: 500,
    margin: '0px auto',
    paddingBottom: theme.spacing[5],
  },
  timeLimitContent: {
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[5],
    width: '100%',
    height: 142,
    position: 'relative',
    backgroundImage: 'url(/public/tests/infoBg.jpg)',
    backgroundSize: 'cover',
  },
  timeLimitImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 207,
    height: 184,
  },
  timeLimitInfo: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: 340,
    transform: 'translateY(-50%)',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  howItWorksModalContainer: {
    padding: theme.spacing[2],
    paddingTop: theme.spacing[6],
  },
  tagline: {
    marginBottom: theme.spacing[7],
  },
  resumeBoxContainer: {
    display: 'flex',
    gap: theme.spacing[2],
    justifyContent: 'center',
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
  resumeBox: {
    width: 162,
    borderRadius: 4,
    paddingLeft: theme.spacing[5],
    paddingRight: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[4],
    backgroundColor: theme.colors.uiBackground02,
  },
  resumeNumber: {
    color: theme.colors.text01,
    fontSize: 32,
    textAlign: 'center',
  },
  resumeLabel: {
    ...getFontProductive(),
    color: theme.colors.text01,
    fontSize: theme.fontSizes[1],
    textAlign: 'center',
  },
  questionHeader: {
    backgroundColor: theme.colors.uiBackground01,
    borderRadius: 4,
    width: '100%',
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[2],
    paddingLeft: theme.spacing[4],
    paddingRight: theme.spacing[4],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  questionStep: {
    width: '210px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionStepBar: {
    width: '100%',
    height: '8px',
    backgroundColor: theme.colors.uiBackground02,
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionStepBaInner: {
    height: '8px',
    backgroundColor: theme.colors.mainBlack,
  },
  questionStepNumbers: {
    paddingLeft: theme.spacing[3],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionValueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 49,
    paddingLeft: theme.spacing[5],
    backgroundColor: theme.colors.ui04,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing[2],
  },
  questionValueCard: {
    backgroundColor: theme.colors.uiBackground02,
    paddingLeft: theme.spacing[4],
    paddingRight: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[3],
    borderRadius: 4,
    marginRight: 2,
    marginLeft: theme.spacing[2],
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  questionCluesCard: {
    backgroundColor: theme.colors.uiBackground01,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  questionClueIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  questionCard: {
    width: '100%',
    backgroundColor: theme.colors.uiBackground01,
    padding: theme.spacing[4],
    textAlign: 'left',
    marginBottom: theme.spacing[6],
    borderRadius: 4,
  },
  questionTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  questionTitleIcon: {
    display: 'inline-block',
    position: 'relative',
    height: '23px',
    width: '23px',
    marginRight: theme.spacing[3],
    color: theme.colors.text05,
  },
  questionClueCard: {
    width: '100%',
    backgroundImage: 'url(/public/tests/papel-rayas.jpg)',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'left center',
    backgroundSize: '100% auto ',
    paddingLeft: 100,
    paddingRight: 150,
    paddingTop: 36,
    paddingBottom: 36,
    position: 'relative',
    borderRadius: 8,
    minHeight: 140,
    marginBottom: theme.spacing[6],
  },
  questionCluePerson: {
    backgroundImage: 'url(/public/tests/clue-person.png)',
    width: '82px',
    height: '80px',
    backgroundSize: 'cover',
    position: 'absolute',
    right: 56,
    top: 28,
  },
  questionImageContainer: {
    backgroundColor: theme.colors.uiBackground02,
    padding: theme.spacing[4],
    borderRadius: 4,
    marginBottom: theme.spacing[4],
  },
  questionImage: {
    maxWidth: '100%',
    borderRadius: 4,
  },
  questionImageBottomMargin: {
    marginBottom: theme.spacing[4],
  },
  questionResponseImageContainer: {
    border: '1px solid',
    borderColor: theme.colors.ui01,
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: theme.spacing[3],
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  questionResponseImageContainerSelected: {
    borderColor: theme.colors.interactive01d,
    backgroundColor: theme.colors.interactive01v1,
  },
  questionResponseImageTextContent: {
    paddingTop: theme.spacing[3],
  },
  questionResponseImageContent: {
    width: '100%',
    position: 'relative',
    paddingBottom: '100%',
  },
  questionResponseImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    objectFit: 'contain',
  },
  questionResponsesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  },
  questionResponsesContainerImages: {
    display: 'grid',
    flexDirection: 'row',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing[3],
  },
  disableResponseBg: {
    position: 'absolute',
    left: -1,
    top: -1,
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    backgroundColor: theme.colors.uiBackground01,
    zIndex: 1,
    opacity: 0.5,
  },
  disableResponseBgWithOutImage: {
    opacity: 0.75,
  },
  disableResponseIcon: {
    width: 22,
    height: 28,
    position: 'absolute',
    right: theme.spacing[3],
    top: theme.spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 3,
    zIndex: 2,
  },
  disableResponseIconWithOutImage: {
    top: theme.spacing[1],
    width: 14,
    height: 14,
    right: theme.spacing[1],
    backgroundColor: 'transparent',
  },
  disableResponseImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    zIndex: 3,
  },
  questionResponseImageContainerClued: {
    cursor: 'not-allowed',
  },
  mapImageContainer: {
    marginLeft: -theme.spacing[4],
    marginRight: -theme.spacing[4],
  },
}));
