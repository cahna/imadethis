import io
from setuptools import setup, find_packages

with io.open('README.md', 'rt', encoding='utf8') as f:
    readme = f.read()

setup(
    name='knock_api',
    version='0.0.1',
    url='https://github.com/cahna/knock_api/',
    license='MIT',
    maintainer='Conor Heine',
    description='Messaging service',
    long_description=readme,
    packages=find_packages(include=['knock_api', 'knock_api.*']),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask>=1.1.1',
        'flask-migrate>=2.5.2',
    ],
    tests_require=['pytest>=5.3.5'],
    setup_requires=['flake8>=3.7.9', 'pytest-runner'],
    extras_require={'test': ['coverage']},
)

