#
# Cookbook Name:: slack_feels
# Recipe:: default
#
# Copyright 2014, Alejandro Baltra
#
# All rights reserved - Do Not Redistribute
#


package 'python-dev'
package 'python-pip'
package 'vim'

execute 'pip install textblob' do
	command 'pip install -U textblob'
	action :run
end

execute 'pip install slackclient' do
	command 'pip install -U slackclient'
	action :run
end

execute 'python -m textblob.download_corpora' do
	command 'python -m nltk.downloader -d /usr/share/nltk_data all'
	action :run
end