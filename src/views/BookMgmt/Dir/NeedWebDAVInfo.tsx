import StatusWrapper from '@/components/StatusWrapper';
import { ROUTE_PATH } from '@/router';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NeedWebDAVInfo = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  return (
    <StatusWrapper>
      <Typography variant="h5" color="text.secondary">
        {t('need webdav')}
      </Typography>
      <Button variant="outlined" onClick={() => nav(`/${ROUTE_PATH.SETTING}`)}>
        {t('goto setting')}
      </Button>
    </StatusWrapper>
  );
};
export default NeedWebDAVInfo;
