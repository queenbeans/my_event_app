class Event < ApplicationRecord
    validates :title, :start_time, :end_time, presence: true
    validates :end_time, comparison: { greater_than: :start_time}
    
    scope :published_events, -> { where(published: true)}
    scope :upcoming, -> { where("end_time > ?", Time.current)}
    scope :past, -> { where("end_time < ?", Time.current)}
    scope :by_start_time, -> {order(start_time: :asc)}
end
