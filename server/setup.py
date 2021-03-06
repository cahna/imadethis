import io
from setuptools import setup, find_packages

with io.open('README.md', 'rt', encoding='utf8') as f:
    readme = f.read()

setup(
    name='imadethis_api',
    version='0.0.1',
    url='https://github.com/cahna/imadethis_api/',
    license='MIT',
    maintainer='Conor Heine',
    description='Server for IMadeThis',
    long_description=readme,
    long_description_content_type='text/markdown',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],
    packages=find_packages(include=['imadethis_api', 'imadethis_api.*']),
    include_package_data=True,
    zip_safe=False,
    python_requires='>=3.7',
    install_requires=[
        'flask>=1.1.1',
        'flask-migrate>=2.5.2',
        'psycopg2-binary>=2.8.4',
    ],
    tests_require=['pytest>=5.3.5'],
    setup_requires=['flake8>=3.7.9', 'pytest-runner'],
    extras_require={'test': ['coverage']},
)

