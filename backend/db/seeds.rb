# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 

CATEGORIES = ["Ruby on Rails", "Database", "GraphQL", "Computer Science", "AWS", "Operating Systems", "Network", "Algorithm", "Data Structures", "React.js", "Javascript"]

def createUsers
  10.times do |index|
    User.create(email: "test@seed#{index}.com", password: "password")
    puts "user created"
  end
end

def createCategories
  CATEGORIES.each_with_index do |category, index|
    Category.create(title: category, body: "#{category} 카테고리 입니다.", position: index)
    puts "category created"
  end
end




# createUsers
# createCategories