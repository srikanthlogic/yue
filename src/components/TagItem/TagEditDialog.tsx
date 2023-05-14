import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { t } from 'i18next';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import fs from '@/modules/fs';
import FormTag, { YupSchema } from '../Form/Tag';

import { ITag } from '@/modules/book/Tag';
import { DialogProps } from '@mui/material';

const TagEditDialog = ({
  tag,
  ...props
}: DialogProps & {
  tag?: ITag;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog {...props}>
      <DialogTitle>{t('action.edit tag')}</DialogTitle>
      <Formik
        validateOnChange={false}
        validationSchema={Yup.object<ITag>({
          ...YupSchema,
          title: YupSchema.title.concat(
            Yup.string().test(
              'is exist',
              t('formHelper.already exist tag') as string,
              async (v) => v === tag?.title || !(await fs.getTagByTitle(v!)),
            ),
          ),
        })}
        initialValues={{
          title: tag?.title || '',
          id: tag?.id || '',
          color: tag?.color,
        }}
        onSubmit={async (values: ITag) => {
          try {
            await fs.updateTag({
              id: values.id,
              info: {
                title: values.title,
                color: values.color,
              },
            });
          } catch (e) {
            console.error((e as Error).stack);
            enqueueSnackbar({
              variant: 'error',
              message: t('actionRes.edit tag fail'),
            });
          } finally {
            props.onClose?.({}, 'escapeKeyDown');
          }
        }}>
        <Form>
          <DialogContent>
            <Box pt={2}>
              <Stack direction="column" gap={2}>
                <FormTag />
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit">{t('action.save')}</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default TagEditDialog;
