class UninavController < ApplicationController
  before_action :replace_relative_urls

  def uninav 
  end

  def branded
  end

  def anchor
  end

  def two_column
  end

  def three_column
  end

  def home_page
  end

  def schools_colleges
  end

  def our_faculty
  end

  def home_page
  end

  def a_z 
  end

  def font_awesome 
  end

  def diversity
  end

  def about
  end

  def undergrad
  end

  def afford
  end

  def graduate
  end

  def student_life
  end

  def tuition
  end

  def home_cascade
  end
end


private 
def replace_relative_urls
  relative_url = "_files"
  # relative_url.sub! '_files', 'https://www.chapman.edu/'
  relative_url ["_files"] = "https://www.chapman.edu/_files"
end