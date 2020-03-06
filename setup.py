import io
from setuptools import setup

with io.open("README.md", "rt", encoding="utf8") as f:
    readme = f.read()

setup(
    name="knock_api",
    version="0.0.1",
    url="https://github.com/cahna/knock_api/",
    license="MIT",
    maintainer="Conor Heine",
    description="Messaging service",
    long_description=readme,
    packages=['knock_api'],
    include_package_data=True,
    zip_safe=False,
    install_requires=["flask"],
    extras_require={"test": ["pytest", "coverage"]},
)

