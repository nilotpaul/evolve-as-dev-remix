import { categories, Tags } from '~/config/site-links';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useFilterPosts } from '~/hooks/useFilterPosts';
import { MultiSelect } from '../ui/multi-select';
import { Input } from '../ui/input';
import { FilterPost } from '~/validations/post.validation';

const PostFilterForm = ({
  formRef,
  form,
  setValues,
}: {
  formRef: React.MutableRefObject<HTMLFormElement | null>;
  form: ReturnType<typeof useFilterPosts>[0];
  mutation: ReturnType<typeof useFilterPosts>[1];
  setValues: React.Dispatch<React.SetStateAction<FilterPost>>;
}) => {
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(async (v) => {
          if (v.title.length >= 3 || v.category.length !== 0 || v.tag.length !== 0) {
            setValues(v);
          }
        })}
        className='mt-3 grid grid-cols-3 gap-5'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter post title...' {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />
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
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
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
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
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
