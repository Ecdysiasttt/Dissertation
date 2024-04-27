# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

graphsAndTitles = [
  ['E-Shop (Simple)', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"E-Shop","size":"120 45","key":-1,"loc":"90 -70"},{"text":"Catalogue","size":"120 45","key":-2,"loc":"-210 60"},{"text":"Payment","size":"120 45","key":-3,"loc":"-50 60"},{"text":"Security","size":"120 45","key":-4,"loc":"230 60"},{"text":"Search","size":"120 45","key":-5,"loc":"390 60"},{"text":"Bank Transfer","size":"120 45","key":-6,"loc":"-120 160"},{"text":"Credit Card","size":"120 45","key":-7,"loc":"20 160"},{"text":"High","size":"120 45","key":-8,"loc":"160 160"},{"text":"Standard","size":"120 45","key":-9,"loc":"300 160"}],"linkDataArray":[{"points":[90,-47.5,90,-37.5,-210,27.5,-210,37.5],"from":-1,"to":-2},{"points":[90,-47.5,90,-37.5,-50,27.5,-50,37.5],"from":-1,"to":-3},{"points":[90,-47.5,90,-37.5,230,27.5,230,37.5],"from":-1,"to":-4},{"points":[90,-47.5,90,-37.5,390,27.5,390,37.5],"from":-1,"to":-5,"arrowheadFill":"white"},{"points":[-120,137.5,-120,127.5,-50,92.5,-50,82.5],"from":-6,"to":-3},{"points":[20,137.5,20,127.5,-50,92.5,-50,82.5],"from":-7,"to":-3},{"points":[160,137.5,160,127.5,230,92.5,230,82.5],"from":-8,"to":-4,"arrowheadFill":"white"},{"points":[300,137.5,300,127.5,230,92.5,230,82.5],"from":-9,"to":-4,"arrowheadFill":"white"}]}'],
  ['E-Shop (Complex)', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"E-Shop","size":"120 45","key":-1,"loc":"90 -70"},{"text":"Catalogue","size":"120 45","key":-2,"loc":"-410 60"},{"text":"Payment","size":"120 45","key":-3,"loc":"-50 60"},{"text":"Security","size":"120 45","key":-4,"loc":"230 60"},{"text":"GUI","size":"120 45","key":-5,"loc":"510 60"},{"text":"Bank Transfer","size":"120 45","key":-6,"loc":"-120 150"},{"text":"Credit Card","size":"120 45","key":-7,"loc":"20 150"},{"text":"High","size":"120 45","key":-8,"loc":"160 150"},{"text":"Medium","size":"120 45","key":-9,"loc":"300 150"},{"text":"Offers","size":"120 45","key":-10,"loc":"-550 150"},{"text":"Info","size":"120 45","key":-11,"loc":"-410 150"},{"text":"Search","size":"120 45","key":-12,"loc":"-270 150"},{"text":"Image","size":"120 45","key":-13,"loc":"-530 240"},{"text":"Price","size":"120 45","key":-14,"loc":"-290 240"},{"text":"Description","size":"120 45","key":-15,"loc":"-410 290"},{"text":"Visa","size":"120 45","key":-16,"loc":"-50 240"},{"text":"AmEx","size":"120 45","key":-17,"loc":"90 240"},{"text":"PC","size":"120 45","key":-18,"loc":"440 150"},{"text":"Mobile","size":"120 45","key":-19,"loc":"580 150"}],"linkDataArray":[{"points":[90,-47.5,90,-37.5,-410,27.5,-410,37.5],"from":-1,"to":-2},{"points":[90,-47.5,90,-37.5,-50,27.5,-50,37.5],"from":-1,"to":-3},{"points":[90,-47.5,90,-37.5,230,27.5,230,37.5],"from":-1,"to":-4,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-550,117.5,-550,127.5],"from":-2,"to":-10,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-270,117.5,-270,127.5],"from":-2,"to":-12,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-410,117.5,-410,127.5],"from":-2,"to":-11},{"points":[-530,217.5,-530,207.5,-410,182.5,-410,172.5],"from":-13,"to":-11},{"points":[-410,267.5,-410,257.5,-410,182.5,-410,172.5],"from":-15,"to":-11},{"points":[-290,217.5,-290,207.5,-410,182.5,-410,172.5],"from":-14,"to":-11},{"points":[-120,127.5,-120,117.5,-50,92.5,-50,82.5],"from":-6,"to":-3},{"points":[20,127.5,20,117.5,-50,92.5,-50,82.5],"from":-7,"to":-3},{"points":[-50,217.5,-50,207.5,20,182.5,20,172.5],"from":-16,"to":-7},{"points":[90,217.5,90,207.5,20,182.5,20,172.5],"from":-17,"to":-7},{"points":[160,127.5,160,117.5,230,92.5,230,82.5],"from":-8,"to":-4,"arrowheadFill":"white"},{"points":[300,127.5,300,117.5,230,92.5,230,82.5],"from":-9,"to":-4,"arrowheadFill":"white"},{"points":[90,-47.5,90,-37.5,510,27.5,510,37.5],"from":-1,"to":-5},{"points":[440,127.5,440,117.5,510,92.5,510,82.5],"from":-18,"to":-5},{"points":[580,127.5,580,117.5,510,92.5,510,82.5],"from":-19,"to":-5}]}'],
  ['E-Shop (Simple) CTCs', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"E-Shop","size":"120 45","key":-1,"loc":"90 -70"},{"text":"Catalogue","size":"120 45","key":-2,"loc":"-210 60"},{"text":"Payment","size":"120 45","key":-3,"loc":"-50 60"},{"text":"Security","size":"120 45","key":-4,"loc":"230 60"},{"text":"Search","size":"120 45","key":-5,"loc":"390 60"},{"text":"Bank Transfer","size":"120 45","key":-6,"loc":"-120 160"},{"text":"Credit Card","size":"120 45","key":-7,"loc":"20 160"},{"text":"High","size":"120 45","key":-8,"loc":"160 160"},{"text":"Standard","size":"120 45","key":-9,"loc":"300 160"}],"linkDataArray":[{"points":[90,-47.5,90,-37.5,-210,27.5,-210,37.5],"from":-1,"to":-2},{"points":[90,-47.5,90,-37.5,-50,27.5,-50,37.5],"from":-1,"to":-3},{"points":[90,-47.5,90,-37.5,230,27.5,230,37.5],"from":-1,"to":-4},{"points":[90,-47.5,90,-37.5,390,27.5,390,37.5],"from":-1,"to":-5,"arrowheadFill":"white"},{"points":[-120,137.5,-120,127.5,-50,92.5,-50,82.5],"from":-6,"to":-3},{"points":[20,137.5,20,127.5,-50,92.5,-50,82.5],"from":-7,"to":-3},{"points":[160,137.5,160,127.5,230,92.5,230,82.5],"from":-8,"to":-4,"arrowheadFill":"white"},{"points":[300,137.5,300,127.5,230,92.5,230,82.5],"from":-9,"to":-4,"arrowheadFill":"white"},{"arrowShape":"Standard","arrowheadFill":"Black","dashed":[5,5],"points":[80,160,90,160,90,160,100,160],"from":-7,"to":-8}]}'],
  ['E-Shop (Complex) CTCs', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"E-Shop","size":"120 45","key":-1,"loc":"90 -70"},{"text":"Catalogue","size":"120 45","key":-2,"loc":"-410 60"},{"text":"Payment","size":"120 45","key":-3,"loc":"-50 60"},{"text":"Security","size":"120 45","key":-4,"loc":"230 60"},{"text":"GUI","size":"120 45","key":-5,"loc":"510 60"},{"text":"Bank Transfer","size":"120 45","key":-6,"loc":"-120 150"},{"text":"Credit Card","size":"120 45","key":-7,"loc":"20 150"},{"text":"High","size":"120 45","key":-8,"loc":"160 150"},{"text":"Medium","size":"120 45","key":-9,"loc":"300 150"},{"text":"Offers","size":"120 45","key":-10,"loc":"-550 150"},{"text":"Info","size":"120 45","key":-11,"loc":"-410 150"},{"text":"Search","size":"120 45","key":-12,"loc":"-270 150"},{"text":"Image","size":"120 45","key":-13,"loc":"-530 240"},{"text":"Price","size":"120 45","key":-14,"loc":"-290 240"},{"text":"Description","size":"120 45","key":-15,"loc":"-410 290"},{"text":"Visa","size":"120 45","key":-16,"loc":"-50 240"},{"text":"AmEx","size":"120 45","key":-17,"loc":"90 240"},{"text":"PC","size":"120 45","key":-18,"loc":"440 150"},{"text":"Mobile","size":"120 45","key":-19,"loc":"580 150"}],"linkDataArray":[{"points":[90,-47.5,90,-37.5,-410,27.5,-410,37.5],"from":-1,"to":-2},{"points":[90,-47.5,90,-37.5,-50,27.5,-50,37.5],"from":-1,"to":-3},{"points":[90,-47.5,90,-37.5,230,27.5,230,37.5],"from":-1,"to":-4,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-550,117.5,-550,127.5],"from":-2,"to":-10,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-270,117.5,-270,127.5],"from":-2,"to":-12,"arrowheadFill":"white"},{"points":[-410,82.5,-410,92.5,-410,117.5,-410,127.5],"from":-2,"to":-11},{"points":[-530,217.5,-530,207.5,-410,182.5,-410,172.5],"from":-13,"to":-11},{"points":[-410,267.5,-410,257.5,-410,182.5,-410,172.5],"from":-15,"to":-11},{"points":[-290,217.5,-290,207.5,-410,182.5,-410,172.5],"from":-14,"to":-11},{"points":[-120,127.5,-120,117.5,-50,92.5,-50,82.5],"from":-6,"to":-3},{"points":[20,127.5,20,117.5,-50,92.5,-50,82.5],"from":-7,"to":-3},{"points":[-50,217.5,-50,207.5,20,182.5,20,172.5],"from":-16,"to":-7},{"points":[90,217.5,90,207.5,20,182.5,20,172.5],"from":-17,"to":-7},{"points":[160,127.5,160,117.5,230,92.5,230,82.5],"from":-8,"to":-4,"arrowheadFill":"white"},{"points":[300,127.5,300,117.5,230,92.5,230,82.5],"from":-9,"to":-4,"arrowheadFill":"white"},{"points":[90,-47.5,90,-37.5,510,27.5,510,37.5],"from":-1,"to":-5},{"points":[440,127.5,440,117.5,510,92.5,510,82.5],"from":-18,"to":-5},{"points":[580,127.5,580,117.5,510,92.5,510,82.5],"from":-19,"to":-5},{"arrowShape":"Standard","arrowheadFill":"Black","dashed":[5,5],"points":[80,150,90,150,90,150,100,150],"from":-7,"to":-8}]}'],
  ['Mobile - No CTCs', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"Mobile Phone","size":"157 45","key":-1,"loc":"60 -140"},{"text":"Calls","size":"120 45","key":-2,"loc":"-220 0"},{"text":"Screen","size":"120 45","key":-4,"loc":"60 0"},{"text":"Media","size":"120 45","key":-8,"loc":"390 -10"},{"text":"GPS","size":"120 45","key":-5,"loc":"-80 0"},{"text":"Camera","size":"120 45","key":-6,"loc":"290 80"},{"text":"MP3","size":"120 45","key":-7,"loc":"420 80"},{"text":"Basic","size":"120 45","key":-9,"loc":"-70 120"},{"text":"Colour","size":"120 45","key":-10,"loc":"60 140"},{"text":"High Res","size":"120 45","key":-11,"loc":"210 140"}],"linkDataArray":[{"arrowShape":"Circle","arrowheadFill":"black","points":[60,-117.5,60,-107.5,-220,-32.5,-220,-22.5],"from":-1,"to":-2},{"arrowShape":"Circle","arrowheadFill":"black","points":[60,-117.5,60,-107.5,60,-32.5,60,-22.5],"from":-1,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,-117.5,60,-107.5,390,-42.5,390,-32.5],"from":-1,"to":-8},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,-117.5,60,-107.5,-80,-32.5,-80,-22.5],"from":-1,"to":-5},{"arrowShape":"Circle","arrowheadFill":"black","points":[290,57.5,290,47.5,390,22.5,390,12.5],"from":-6,"to":-8},{"arrowShape":"Circle","arrowheadFill":"black","points":[420,57.5,420,47.5,390,22.5,390,12.5],"from":-7,"to":-8},{"arrowShape":"Circle","arrowheadFill":"white","points":[-70,97.5,-70,87.5,60,32.5,60,22.5],"from":-9,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,117.5,60,107.5,60,32.5,60,22.5],"from":-10,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[182.22222222222223,117.5,60,32.5,60,22.5],"from":-11,"to":-4}]}'],
  ['Mobile - CTCs', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"Mobile Phone","size":"157 45","key":-1,"loc":"60 -140"},{"text":"Calls","size":"120 45","key":-2,"loc":"-220 0"},{"text":"GPS","size":"120 45","key":-3,"loc":"-90 0"},{"text":"Screen","size":"120 45","key":-4,"loc":"60 0"},{"text":"Basic","size":"120 45","key":-5,"loc":"-70 110"},{"text":"Colour","size":"120 45","key":-6,"loc":"60 110"},{"text":"High Res","size":"120 45","key":-7,"loc":"190 110"},{"text":"Media","size":"120 45","key":-8,"loc":"390 -10"},{"text":"Camera","size":"120 45","key":-9,"loc":"320 110"},{"text":"MP3","size":"120 45","key":-10,"loc":"460 110"}],"linkDataArray":[{"arrowShape":"Circle","arrowheadFill":"black","points":[60,-117.5,60,-107.5,-220,-32.5,-220,-22.5],"from":-1,"to":-2},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,-117.5,60,-107.5,-90,-32.5,-90,-22.5],"from":-1,"to":-3},{"arrowShape":"Circle","arrowheadFill":"black","points":[60,-117.5,60,-107.5,60,-32.5,60,-22.5],"from":-1,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[-70,87.5,-70,77.5,60,32.5,60,22.5],"from":-5,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,87.5,60,77.5,60,32.5,60,22.5],"from":-6,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[190,87.5,190,77.5,60,32.5,60,22.5],"from":-7,"to":-4},{"arrowShape":"Circle","arrowheadFill":"white","points":[60,-117.5,60,-107.5,390,-42.5,390,-32.5],"from":-1,"to":-8},{"arrowShape":"Circle","arrowheadFill":"black","points":[320,87.5,320,77.5,390,22.5,390,12.5],"from":-9,"to":-8},{"arrowShape":"Circle","arrowheadFill":"black","points":[460,87.5,460,77.5,390,22.5,390,12.5],"from":-10,"to":-8},{"arrowShape":"Standard","arrowheadFill":"Black","dashed":[5,5],"points":[320,132.5,320,142.5,190,142.5,190,132.5],"from":-9,"to":-7},{"arrowShape":"Standard","arrowheadFill":"Black","dashed":[5,5],"fromArrowShape":"Backward","points":[-90,22.5,-90,32.5,-140,110,-130,110],"from":-3,"to":-5}]}'],
  ['Void Test', '{"class":"GraphLinksModel","nodeDataArray":[{"text":"E-Shop","size":"120 45","key":-1,"loc":"-60 -170"},{"text":"Feature 1","size":"120 45","key":-2,"loc":"-200 -30"},{"text":"Feature 2","size":"120 45","key":-3,"loc":"-10 -30"},{"text":"Feature 3","size":"120 45","key":-4,"loc":"170 -30"}],"linkDataArray":[{"arrowShape":"Circle","arrowheadFill":"black","points":[-60,-147.5,-60,-137.5,-200,-62.5,-200,-52.5],"from":-1,"to":-2},{"arrowShape":"Circle","arrowheadFill":"black","points":[-60,-147.5,-60,-137.5,-10,-62.5,-10,-52.5],"from":-1,"to":-3},{"arrowShape":"Circle","arrowheadFill":"black","points":[-60,-147.5,-60,-137.5,170,-62.5,170,-52.5],"from":-1,"to":-4},{"arrowShape":"Standard","arrowheadFill":"Black","dashed":[5,5],"fromArrowShape":"Backward","points":[50,-30,60,-30,100,-30,110,-30],"from":-3,"to":-4}]}']
]

forenames = [
  "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas",
  "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "Joshua",
  "George", "Kevin", "Brian", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Gary",
  "Jacob", "Nicholas", "Eric", "Stephen", "Jonathan", "Larry", "Justin", "Scott", "Brandon", "Benjamin",
  "Samuel", "Gregory", "Frank", "Alexander", "Raymond", "Patrick", "Jack", "Dennis", "Jerry", "Tyler",
  "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
  "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon",
  "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
  "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda",
  "Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Joyce", "Diane"
]

surnames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez",
  "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris",
  "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey",
  "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", 
  "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez",
  "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins"
]

email_providers = [
"gmail.com",
"yahoo.com",
"hotmail.com",
"outlook.com",
"aol.com",
"icloud.com",
"live.com",
"msn.com",
"me.com",
"protonmail.com"
]

User.create!(
  email: 'harryscutt08@gmail.com',
  password: 'password',
  username: 'Harry Scutt',
  isAdmin: true
)

User.create!(
  email: 'cherbert2003dat@gmail.com',
  password: 'password',
  username: 'Claire Herbert',
  isAdmin: true
)


# Create 50 users
50.times do
  forename = forenames.sample
  surname = surnames.sample
  username = "#{forename} #{surname}"
  email = "#{forename.downcase}#{surname.downcase}@#{email_providers.sample}"
  password = 'password'

  User.create!(
    email: email,
    password: password,
    username: username
  )
end

# Make each user follow 0-15 random users
User.all.each do |user|
  rand(0..15).times do

    followed_user = nil
    while followed_user.nil? || Follow.find_by(user: user.id, follows: followed_user.id)
      followed_user = User.where.not(id: user.id).sample
    end

    Follow.create!(user: user.id, follows: followed_user.id)
  end
end


600.times do
  user_id = User.pluck(:id).sample
  title, graph = graphsAndTitles.sample

  Fmodel.create!(
    created_by: user_id,
    graph: graph,
    visibility: ["global", "unlisted", "followers"].sample,
    title: title
  )
end
