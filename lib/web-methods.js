export default [{
  name: 'api.test',
  errors: {}
}, {
  name: 'auth.test',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.archive',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    already_archived: 'Channel has already been archived.',
    cant_archive_general: 'You cannot archive the general channel',
    last_ra_channel: 'You cannot archive the last channel for a restricted account',
    restricted_action: 'A team preference prevents the authenticated user from archiving.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.create',
  errors: {
    name_taken: 'A channel cannot be created with the given name.',
    restricted_action: 'A team preference prevents the authenticated user from creating channels.',
    no_channel: 'Value passed for name was empty.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.history',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_ts_latest: 'Value passed for latest was invalid',
    invalid_ts_oldest: 'Value passed for oldest was invalid',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.info',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.invite',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    user_not_found: 'Value passed for user was invalid.',
    cant_invite_self: 'Authenticated user cannot invite themselves to a channel.',
    not_in_channel: 'Authenticated user is not in the channel.',
    already_in_channel: 'Invited user is already in the channel.',
    is_archived: 'Channel has been archived.',
    cant_invite: 'User cannot be invited to this channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'channels.join',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    name_taken: 'A channel cannot be created with the given name.',
    restricted_action: 'A team preference prevents the authenticated user from creating channels.',
    no_channel: 'Value passed for name was empty.',
    is_archived: 'Channel has been archived.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.kick',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    user_not_found: 'Value passed for user was invalid.',
    cant_kick_self: 'Authenticated user can\'t kick themselves from a channel.',
    not_in_channel: 'User was not in the channel.',
    cant_kick_from_general: 'User cannot be removed from #general.',
    cant_kick_from_last_channel: 'User cannot be removed from the last channel they\'re in.',
    restricted_action: 'A team preference prevents the authenticated user from kicking.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.leave',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    is_archived: 'Channel has been archived.',
    cant_leave_general: 'Authenticated user cannot leave the general channel',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.list',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.mark',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_timestamp: 'Value passed for timestamp was invalid.',
    not_in_channel: 'Caller is not a member of the channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.rename',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_in_channel: 'Caller is not a member of the channel.',
    not_authorized: 'Caller cannot rename this channel',
    invalid_name: 'New name is invalid',
    name_taken: 'New channel name is taken',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'channels.setPurpose',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_in_channel: 'Authenticated user is not in the channel.',
    is_archived: 'Channel has been archived.',
    too_long: 'Purpose was longer than 250 characters.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.setTopic',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_in_channel: 'Authenticated user is not in the channel.',
    is_archived: 'Channel has been archived.',
    too_long: 'Topic was longer than 250 characters.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'channels.unarchive',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_archived: 'Channel is not archived.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'chat.delete',
  errors: {
    message_not_found: 'No message exists with the requested timestamp.',
    channel_not_found: 'Value passed for channel was invalid.',
    cant_delete_message: 'Authenticated user does not have permission to delete this message.',
    compliance_exports_prevent_deletion: 'Compliance exports are on, messages can not be deleted',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'chat.postMessage',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_in_channel: 'Cannot post user messages to a channel they are not in.',
    is_archived: 'Channel has been archived.',
    msg_too_long: 'Message text is too long',
    no_text: 'No message text provided',
    rate_limited: 'Application has posted too many messages, read the Rate Limit documentation for more information',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'chat.update',
  errors: {
    message_not_found: 'No message exists with the requested timestamp.',
    cant_update_message: 'Authenticated user does not have permission to update this message.',
    channel_not_found: 'Value passed for channel was invalid.',
    edit_window_closed: 'The message cannot be edited due to the team message edit settings',
    msg_too_long: 'Message text is too long',
    no_text: 'No message text provided',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'emoji.list',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'files.delete',
  errors: {
    file_not_found: 'The file does not exist, or is not visible to the calling user.',
    file_deleted: 'The file has already been deleted.',
    cant_delete_file: 'Authenticated user does not have permission to delete this file.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'files.info',
  errors: {
    file_not_found: 'Value passed for file was invalid',
    file_deleted: 'The requested file has been deleted',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'files.list',
  errors: {
    user_not_found: 'Value passed for user was invalid',
    unknown_type: 'Value passed for types was invalid',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'files.upload',
  errors: {
    posting_to_general_channel_denied: 'An admin has restricted posting to the #general channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'groups.archive',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    already_archived: 'Group has already been archived.',
    group_contains_others: 'Restricted accounts cannot archive groups containing others.',
    last_ra_channel: 'You cannot archive the last channel for a restricted account.',
    restricted_action: 'A team preference prevents the authenticated user from archiving.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'groups.close',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.create',
  errors: {
    no_channel: 'No group name was passed.',
    restricted_action: 'A team preference prevents the authenticated user from creating groups.',
    name_taken: 'A group cannot be created with the given name.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'groups.createChild',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    already_archived: 'An archived group cannot be cloned',
    restricted_action: 'A team preference prevents the authenticated user from creating groups.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'groups.history',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_ts_latest: 'Value passed for latest was invalid',
    invalid_ts_oldest: 'Value passed for oldest was invalid',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.info',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.invite',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    user_not_found: 'Value passed for user was invalid.',
    cant_invite_self: 'Authenticated user cannot invite themselves to a group.',
    is_archived: 'Group has been archived.',
    cant_invite: 'User cannot be invited to this group.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'groups.kick',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    user_not_found: 'Value passed for user was invalid.',
    cant_kick_self: 'You can\'t remove yourself from a group',
    not_in_group: 'User or caller were are not in the group',
    restricted_action: 'A team preference prevents the authenticated user from kicking.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'groups.leave',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    is_archived: 'Group has been archived.',
    cant_leave_last_channel: 'Authenticated user cannot leave the last channel they are in',
    last_member: 'Authenticated user is the last member of a group and cannot leave it',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_ultra_restricted: 'This method cannot be called by a single channel guest.'
  }
}, {
  name: 'groups.list',
  errors: {
    not_authed: 'No authentication token provided.',
invalid_auth: 'Invalid authentication token.',
account_inactive: 'Authentication token is for a deleted user or team.',
  }
}, {
  name: 'groups.mark',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_timestamp: 'Value passed for timestamp was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.open',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.rename',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_name: 'New name is invalid',
    name_taken: 'New channel name is taken',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'groups.setPurpose',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    is_archived: 'Private group has been archived',
    too_long: 'Purpose was longer than 250 characters.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.setTopic',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    is_archived: 'Private group has been archived',
    too_long: 'Topic was longer than 250 characters.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'groups.unarchive',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_archived: 'Group is not archived.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.',
    user_is_restricted: 'This method cannot be called by a restricted user or single channel guest.'
  }
}, {
  name: 'im.close',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    user_does_not_own_channel: 'Calling user does not own this DM channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'im.history',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_ts_latest: 'Value passed for latest was invalid',
    invalid_ts_oldest: 'Value passed for oldest was invalid',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'im.list',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'im.mark',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    invalid_timestamp: 'Value passed for timestamp was invalid.',
    not_in_channel: 'Caller is not a member of the channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'im.open',
  errors: {
    user_not_found: 'Value passed for user was invalid.',
    user_not_visible: 'The calling user is restricted from seeing the requested user.',
    user_disabled: 'The user has been disabled.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'oauth.access',
  errors: {
    invalid_client_id: 'Value passed for client_id was invalid.',
    bad_client_secret: 'Value passed for client_secret was invalid.',
    invalid_code: 'Value passed for code was invalid.',
    bad_redirect_uri: 'Value passed for redirect_uri did not match the redirect_uri in the original request.'
  }
}, {
  name: 'pins.add',
  errors: {
    bad_timestamp: 'Value passed for timestamp was invalid.',
    file_not_found: 'File specified by file does not exist.',
    file_comment_not_found: 'File comment specified by file_comment does not exist.',
    message_not_found: 'Message specified by channel and timestamp does not exist.',
    channel_not_found: 'The channel argument was not specified or was invalid',
    no_item_specified: 'One of file, file_comment, or timestamp was not specified.',
    already_pinned: 'The specified item is already pinned to the channel.',
    permission_denied: 'The user does not have permission to add pins to the channel.',
    file_not_shared: 'File specified by file is not public nor shared to the channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'pins.list',
  errors: {
    channel_not_found: 'Value passed for channel was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'pins.remove',
  errors: {
    bad_timestamp: 'Value passed for timestamp was invalid.',
    file_not_found: 'File specified by file does not exist.',
    file_comment_not_found: 'File comment specified by file_comment does not exist.',
    message_not_found: 'Message specified by channel and timestamp does not exist.',
    no_item_specified: 'One of file, file_comment, or timestamp was not specified.',
    not_pinned: 'The specified item is not pinned to the channel.',
    permission_denied: 'The user does not have permission to remove pins from the channel.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'reactions.add',
  errors: {
    bad_timestamp: 'Value passed for timestamp was invalid.',
    file_not_found: 'File specified by file does not exist.',
    file_comment_not_found: 'File comment specified by file_comment does not exist.',
    message_not_found: 'Message specified by channel and timestamp does not exist.',
    no_item_specified: 'file, file_comment, or combination of channel and timestamp was not specified.',
    invalid_name: 'Value passed for name was invalid.',
    already_reacted: 'The specified item already has the user/reaction combination.',
    too_many_emoji: 'The limit for distinct reactions (i.e emoji) on the item has been reached.',
    too_many_reactions: 'The limit for reactions a person may add to the item has been reached.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'reactions.get',
  errors: {
    bad_timestamp: 'Value passed for timestamp was invalid.',
    file_not_found: 'File specified by file does not exist.',
    file_comment_not_found: 'File comment specified by file_comment does not exist.',
    message_not_found: 'Message specified by channel and timestamp does not exist.',
    no_item_specified: 'file, file_comment, or combination of channel and timestamp was not specified.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'reactions.list',
  errors: {
    user_not_found: 'Value passed for user was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'reactions.remove',
  errors: {
    bad_timestamp: 'Value passed for timestamp was invalid.',
    file_not_found: 'File specified by file does not exist.',
    file_comment_not_found: 'File comment specified by file_comment does not exist.',
    message_not_found: 'Message specified by channel and timestamp does not exist.',
    no_item_specified: 'file, file_comment, or combination of channel and timestamp was not specified.',
    invalid_name: 'Value passed for name was invalid.',
    no_reaction: 'The specified item does not have the user/reaction combination.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'rtm.start',
  errors: {
    migration_in_progress: 'Team is being migrated between servers. See the team_migration_started event documentation for details.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'search.all',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'search.files',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'search.messages',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'stars.list',
  errors: {
    user_not_found: 'Value passed for user was invalid',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'team.accessLogs',
  errors: {
    paid_only: 'This is only available to paid teams.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'team.info',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'users.getPresence',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'users.info',
  errors: {
    user_not_found: 'Value passed for user was invalid.',
    user_not_visible: 'The requested user is not visible to the calling user',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'users.list',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}, {
  name: 'users.setActive',
  errors: {
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.',
    user_is_bot: 'This method cannot be called by a bot user.'
  }
}, {
  name: 'users.setPresence',
  errors: {
    invalid_presence: 'Value passed for presence was invalid.',
    not_authed: 'No authentication token provided.',
    invalid_auth: 'Invalid authentication token.',
    account_inactive: 'Authentication token is for a deleted user or team.'
  }
}];
