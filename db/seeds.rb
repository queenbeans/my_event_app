puts "Cleaning database..."
Event.destroy_all

Event.create!(
    title: "Past: #{Faker::App.name} Launch",
    location: Faker::Address.full_address,
    description: Faker::Lorem.paragraph(sentence_count: 3),
    start_time: 1.week.from_now,
    end_time: 1.week.from_now + 2.hours,
    published: false
)

5.times do
  start = Faker::Time.between(from: 1.day.from_now, to: 1.year.from_now)
  Event.create!(
    title: "#{Faker::Company.name} #{Faker::Job.field} Meetup",
    description: Faker::Lorem.paragraph(sentence_count: 3),
    location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
    start_time: start,
    end_time: start + [1, 2, 4, 8].sample.hours,
    published: true
  )
end

2.times do
  start = Faker::Time.backward(days: 30)
  Event.create!(
    title: "Past: #{Faker::App.name} Launch",
    description: Faker::Lorem.paragraph(sentence_count: 3),
    location: Faker::Address.full_address,
    start_time: start,
    end_time: start + 3.hours,
    published: true
  )
end

puts "✅ Seeded #{Event.count} events!"