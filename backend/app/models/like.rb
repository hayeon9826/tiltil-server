class Like < ApplicationRecord
  belongs_to :targetable, polymorphic: true, counter_cache: :likes_count
  belongs_to :user
end
