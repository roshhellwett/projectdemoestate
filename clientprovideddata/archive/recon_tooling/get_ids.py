import json
data = json.load(open('site_data.json'))
prop_ids = sorted(data.get('properties', {}).keys())
blog_ids = sorted(data.get('blogposts', {}).keys())
print('PROPS:', len(prop_ids))
print('\n'.join('/property/' + i for i in prop_ids))
print('BLOGS:', len(blog_ids))
print('\n'.join('/blog/' + i for i in blog_ids))
