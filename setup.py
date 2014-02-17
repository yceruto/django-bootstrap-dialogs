import os
from setuptools import setup, find_packages

CLASSIFIERS = [
    'Environment :: Web Environment',
    'Framework :: Twitter Bootstrap',
    'Intended Audience :: Developers',
    'License :: OSI Approved :: MIT License',
    'Operating System :: OS Independent',
    'Programming Language :: Javascript',
    'Topic :: Internet :: WWW/HTTP',
    'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
]

README = open(os.path.join(os.path.dirname(__file__), 'README.rst')).read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

# Dynamically calculate the version based on django.VERSION.
version = __import__('bootstrap_dialogs').get_version()

setup(
    author='Yonel Ceruto Glez',
    author_email='yceruto@abalt.org',
    name='bootstrap-dialogs',
    version=version,
    description='Flexibles windows modal for web applications. Display yours messages and forms with less code. Based on window modal of Twitter Bootstrap 3.',
    long_description=README,
    url='https://github.com/yceruto/bootstrap-dialogs',
    license='MIT License',
    platforms=['OS Independent'],
    classifiers=CLASSIFIERS,
    install_requires=[
        'setuptools'
    ],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False
)
