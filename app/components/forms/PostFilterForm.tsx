import { categories, Tags } from '~/config/site-links';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useFilterPosts } from '~/hooks/useFilterPosts';
import { MultiSelect } from '../ui/multi-select';

const PostFilterForm = ({
  formRef,
  form,
  mutation: filterPostsMutation,
}: {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  form: ReturnType<typeof useFilterPosts>[0];
  mutation: ReturnType<typeof useFilterPosts>[1];
}) => {
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((v) => {
          if (v.category.length !== 0 || v.tag.length !== 0) {
            filterPostsMutation.refetch();
          }
        })}
        className='mt-3 grid grid-cols-3 gap-5'
      >
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Category</FormLabel>
              <FormControl>
                <MultiSelect
                  options={categories
                    .slice()
                    .map((c) => ({ label: c.name, value: c.originalName }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder='Select options'
                  variant='inverted'
                  animation={2}
                  maxCount={3}
                  className='bg-background hover:bg-background'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.category?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tag'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Tag</FormLabel>
              <FormControl>
                <MultiSelect
                  options={Tags.slice().map((tag) => ({
                    label: tag.name,
                    value: tag.originalName,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder='Select options'
                  variant='inverted'
                  capitalizeValues
                  animation={2}
                  maxCount={3}
                  className='bg-background hover:bg-background'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.tag?.message}</FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PostFilterForm;
